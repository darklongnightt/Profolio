const cleanData = ({ error, mode, ...rest }) => rest;

export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Get states from the store
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    project = cleanData(project);

    // Make async db call then dispatch state
    firestore
      .collection("users")
      .doc(userId)
      .collection("projects")
      .add({
        ...project,
        userId: userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = projectId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Get states from the store
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    // Make async db call then dispatch state
    firestore
      .collection("users")
      .doc(userId)
      .collection("projects")
      .doc(projectId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PROJECT", projectId });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};

export const editProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Get states from the store
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    project = cleanData(project);

    // Make async db call then dispatch state
    firestore
      .collection("users")
      .doc(userId)
      .collection("projects")
      .doc(project.id)
      .set({
        ...project,
        userId: userId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        modifiedAt: new Date()
      })
      .then(() => {
        dispatch({ type: "EDIT_PROJECT", project });
      })
      .catch(err => {
        dispatch({ type: "EDIT_PROJECT_ERROR", err });
      });
  };
};
