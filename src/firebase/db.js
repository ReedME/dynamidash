import { db } from './firebase';

// User API

export const doCreateUser = (id, names, email) =>
  db.collection(`users`).doc(id).set({
    names,
    email,
  });

export const doUpdateUser = (id, names, email) => {
  db.collection(`users`).doc(id).set({
    names,
    email,
  }, {merge: true})

  }

export const getCurrentUser = (user) => {
    
    const userId = user.uid;
    console.log("0 "+user.uid);
    console.log("1 "+userId);
    
    let docRef = db.collection('users').doc(userId)
    
    
    return docRef.get()
    
        
}


  export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...