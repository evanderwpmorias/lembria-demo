

import { authAdmin } from "./firebase";


export const handleNewUser = async () => {
 try {
    const users = await authAdmin.listUsers();
  return users;
 } catch (error) {
    console.log(error);
    return { error };
}

}


export const getUserIdBySession = async (userToken: string) => {
   let uid = null;
   await authAdmin.verifySessionCookie(userToken).then((decodedToken: any) => {
     console.log('decodedToken:', decodedToken)
     uid = decodedToken.uid;
     // ...
   }).catch(function(error) {
     // Handle errorconso
     console.log(error);
   });
   return  uid;
 };

 export const getUserBySession = async (userToken: string) => {
   let user = null;
   await authAdmin.verifySessionCookie(userToken).then((decodedToken: any) => {
     user = decodedToken;
     // ...
   }).catch(function(error) {
     // Handle errorconso
     console.log(error);
   });
   return  user;
 };
 
export const getUserIdByToken = async (userToken: string) => {
  console.log('userToken:', userToken)
   let uid = null;
   await authAdmin.verifyIdToken(userToken).then((decodedToken: any) => {
     uid = decodedToken.uid;
     // ...
   }).catch(function(error) {
     // Handle errorconso
     console.log(error);
   });
   return  uid;
 };
 
 export const addNewUser = async (userData: any) => {
   return authAdmin.createUser(userData);
 };
 
 export const setRole = async (uid: string, role: string) => {
   return authAdmin.setCustomUserClaims(uid, {role});
 };
 
 

export const getRole = async (uid: string) => {
   const role = await authAdmin.getUser(uid).then((user) => {
     // The claims can be accessed on the user record
     const {customClaims} = user;
     return ( customClaims && "role" in customClaims) ?
      customClaims["role"] : false;
   }).catch(() => false);
   return role;
 };
 

export const getUserByToken = async (request: any, includeEmail?:boolean ) => {
   let userToken:any;
   let user;
   if (request && request.get("Authorization")) {
     userToken = request.get("Authorization").replace("Bearer ", "");
     userToken = userToken.replace(" ", "");
   } else {
     return false;
   }
    
   await authAdmin.verifyIdToken(userToken).then(async (decodedToken) => {
     const {name = "", uid, picture = "", email} = decodedToken;
     const role = await getRole(uid);
     user = {displayName: name, uid, photoURL: picture, role};
     if (includeEmail === true) {
       user = {...user, email};
     }
     // ...
   }).catch(function(error) {
     // Handle errorconso
     console.log(error);
   });
   return (user) ? user : false;
 };


 export const createNewUser = async (userData: any) => {
  const { email, password, name, _id, role } = userData;
  try {
    const userRecord = await authAdmin.createUser({
      email,
      emailVerified: false,
      password,
      displayName: name,
      disabled: false,
    });

    const uid = userRecord.uid;
    await authAdmin.setCustomUserClaims(uid, { role: role, userId: _id });

    return uid;
  } catch (error) {
    console.error('Error creating new user or setting custom claims:', error);
    throw error;
  }
}

export const deleteUser = async (uid: string) => {
  try {
    await authAdmin.deleteUser(uid);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export const deactivateUser = async (uid: string) => {
  try {
    await authAdmin.updateUser(uid, { disabled: true });
    return true;
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  }
}

export const activateUser = async (uid: string) => {
  try {
    await authAdmin.updateUser(uid, { disabled: false });
    return true;
  } catch (error) {
    console.error('Error activating user:', error);
    throw error;
  }
}

export const updateUser = async (uid: string, userData: any) => {
  try {
    const { name:displayName, role, _id } = userData;
    await authAdmin.updateUser(uid, { displayName });
    if (role) {
      await authAdmin.setCustomUserClaims(uid, { role,  userId: _id});
    }
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}