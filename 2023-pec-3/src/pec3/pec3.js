/**
 * User input readed from a web form
 */
export class UserForm {
  constructor(data) {
    /** The user's name */
    this.userName = data.username;
    /** The desired password */
    this.password = data.password;
    /** The confirmed password */
    this.confirmPassword = data.confirmPassword;
  }
}

/**
 * The data of a single user
 */
export class UserData {
  constructor(data) {
    /** The user's name */
    this.userName = data.username;
    /** The user's password */
    this.password = data.password;
    /** THe user's email */
    this.email = data.email;
  }
}

/**
 * Exercise 1, 1.5 points
 *
 * @param {String[]|null} data
 * @param {(data,error)=>any} callback
 */
export function generateStats(data, callback) {
  if (data == null || !Array.isArray(data)) {
    return callback(null, "Invalid input");
  }

  const stats = {};
  data
    .filter((item) => item !== null)
    .forEach((item) => {
      stats[item] = (stats[item] || 0) + 1;
    });

  return callback(stats, null);
}

/**
 * Exercise 2, 1.5 points
 *
 * @param {Number} time
 * @param {Array} info
 * @param {(data:Array)=>any} callback
 * @returns
 */
export function callbackPromise(time, info, callback) {
  return new Promise((resolve, reject) => {
    if (
      time == null ||
      typeof time !== "number" ||
      time < 0 ||
      info == null ||
      !Array.isArray(info) ||
      typeof callback !== "function"
    ) {
      reject(Symbol("Some error with params"));
      return;
    }

    setTimeout(() => {
      try {
        const cbResult = callback(info);
        if (!Array.isArray(cbResult) || cbResult.length !== info.length) {
          reject(Symbol("Some error with array returned from callback"));
        } else {
          const sumResult = info.map((value, index) => value + cbResult[index]);
          resolve(sumResult);
        }
      } catch (error) {
        reject(error);
      }
    }, time);
  });
}

/**
 * Exercise 3, 1.5 points
 *
 * @param {FormData} formData The user input data
 * @param {(name:String)=>Promise<Boolean>} userExists Function that takes an user name and
 * returns a promise that states whether the user exists or not.
 *
 */
export function validateForm(formData, userExists) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!formData.userName) {
        throw new Error("userName cannot be null");
      }

      if (!formData.password) {
        throw new Error("password cannot be null");
      }

      if (formData.confirmPassword !== formData.password) {
        throw new Error("passwords don't match");
      }

      const userAlreadyExists = await userExists(formData.userName);

      if (userAlreadyExists) {
        throw new Error("userName already exists");
      }

      resolve({
        userName: formData.userName,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    } catch (error) {
      reject(error.message);
    }
  });
}

/**
 * Exercise 4, 1.5 points
 *
 * @param {()=>Promise<UserData>} getUserData Function that returns a promise with the user form data
 * @param {(data:UserData)=>Promise<Number>} validateData Validates user data and returns
 * a promise with a validation number
 * @param {(data:UserData)=>Promise<String>} saveUserData Stores user data and returns the new record ID
 * @returns {Promise<{userData:UserData,validationCode:Number,userId:String}}
 */
export function registrationProcess(getUserData, validateData, saveUserData) {
  return new Promise((resolve, reject) => {
    let userData;
    let validationCode;

    getUserData()
      .then((user) => {
        userData = user;
        return validateData(user);
      })
      .then((code) => {
        validationCode = code;
        return saveUserData(userData);
      })
      .then((userId) => {
        resolve({
          userData: userData,
          validationCode: validationCode,
          userId: userId,
        });
      })
      .catch((error) => {
        reject(`REGISTRATION FAILED: ${error}`);
      });
  });
}

/**
 * Exercise 5, 1.5 points
 */
export async function asyncProcess(times, produce, consume) {
  let i;

  try {
    const results = [];

    for (i = 0; i < times; i++) {
      const producedData = await produce();

      for (const item of producedData) {
        const consumedResult = await consume(item);
        results.push(consumedResult);
      }
    }

    return results;
  } catch (e) {
    throw Error(`Error on iteration ${i}: ${e.message}`);
  }
}

/**
 * Exercise 6, 1.5 points
 *
 * @param {()=>Promise} produce
 * @param {(data:any)=>Promise} consume
 * @returns
 */
const STATUSES = {
  Idle: 0,
  Running: 1,
  Finished: 2,
};

export function backgroundProcess(produce, consume) {
  let status = STATUSES.Idle;
  let totalProduced = 0;
  let available = [];
  let intervalId;

  const process = async () => {

    status = STATUSES.Running;
    let result;

    try {
      result = await produce();
      available.push(...result);
      totalProduced += result.length;

      if (result == null) {
        status = STATUSES.Finished;
        clearInterval(intervalId);
        return;
      }

      await Promise.all(result.map((item) => consume(item)));
    } catch (err) {
      status = STATUSES.Finished;
      clearInterval(intervalId);
    }
  };

  const getStatus = () => {
    const avail = available.slice();
    available.length = 0;
    return { available: avail, totalProduced, status };
  };

  intervalId = setInterval(process, 100);

  return getStatus;
}

/*
export function backgroundProcess(produce, consume) {
  let status = STATUSES.Idle;
  let totalProduced = 0;
  let available = [];
  let intervalId;

  const process = async () => {
    status = STATUSES.Running;
    let result;

    try {
      result = await produce();

      if (result == null) {
        status = STATUSES.Finished;
        clearInterval(intervalId);
        return;
      }

      //Serialized consume
      for (const item of result) {
        await consume(item);
        available.push(item);
        totalProduced++;
      }

    } catch (err) {
      status = STATUSES.Finished;
      throw new Error("background process error");
    }
  };

  const getStatus = () => {
    const avail = available.slice();
    available.length = 0;
    return { available:avail, totalProduced, status };
  };

  intervalId = setInterval(process, 100);

  return getStatus;
}
*/

/*
export function backgroundProcess(produce, consume) {
  let status = STATUSES.Idle;
  let totalProduced = 0;
  let available = [];

  const process = async () => {
    status = STATUSES.Running;
    let result;

    try {
      while (true) {
        result = await produce();

        if (result == null) {
          status = STATUSES.Finished;
          break;
        }

        //Serialized consume
        for (const item of result) {
          await consume(item);
          available.push(item);
          totalProduced++;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (err) {
      status = STATUSES.Finished;
      throw new Error("background process error");
    }
  };

  const getStatus = () => {
    const avail = available.slice();
    available.length = 0;
    return { available:avail, totalProduced, status };
  };

  setTimeout(process, 100);

  return getStatus;
}
*/