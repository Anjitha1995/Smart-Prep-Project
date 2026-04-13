import { createSlice } from "@reduxjs/toolkit";
import {
  getSubjectsByUser,
  saveSubjectForUser,
  updateSubjectForUser,
  deleteSubjectForUser,
} from "../../services/subjectStorageServices";

const initialState = {
  subjects: [],
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },

    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },

    editSubject: (state, action) => {
      state.subjects = state.subjects.map((subject) =>
        subject.id === action.payload.id ? action.payload : subject
      );
    },

    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter(
        (subject) => subject.id !== action.payload
      );
    },

    markTopicCompleted: (state, action) => {
      const { subjectId, topicId } = action.payload;

      state.subjects = state.subjects.map((subject) => {
        if (subject.id !== subjectId) return subject;

        const updatedTopics = subject.topics.map((topic) =>
          topic.id === topicId ? { ...topic, completed: true } : topic
        );

        const completedCount = updatedTopics.filter(
          (topic) => topic.completed
        ).length;

        return {
          ...subject,
          topics: updatedTopics,
          progress: updatedTopics.length
            ? Math.round((completedCount / updatedTopics.length) * 100)
            : 0,
        };
      });
    },

    markRevisionCompleted: (state, action) => {
      const { subjectId, topicId } = action.payload;

      state.subjects = state.subjects.map((subject) => {
        if (subject.id !== subjectId) return subject;

        return {
          ...subject,
          topics: subject.topics.map((topic) =>
            topic.id === topicId
              ? {
                  ...topic,
                  revisionCompleted: true,
                  revisionHistory: [
                    ...(topic.revisionHistory || []),
                    new Date().toISOString(),
                  ],
                }
              : topic
          ),
        };
      });
    },
  },
});

export const {
  setSubjects,
  addSubject,
  editSubject,
  removeSubject,
  markTopicCompleted,
  markRevisionCompleted,
} = subjectSlice.actions;

export const loadSubjectsForUser = (userId) => (dispatch) => {
  const subjects = getSubjectsByUser(userId);
  dispatch(setSubjects(subjects));
};

export const addSubjectForUser = (userId, subject) => (dispatch) => {
  const newSubject = { ...subject, userId };
  saveSubjectForUser(userId, newSubject);
  dispatch(addSubject(newSubject));
};

export const editSubjectForUser = (userId, updatedSubject) => (dispatch) => {
  const subjectWithUser = { ...updatedSubject, userId };
  updateSubjectForUser(userId, subjectWithUser);
  dispatch(editSubject(subjectWithUser));
};

export const removeSubjectForUser = (userId, subjectId) => (dispatch) => {
  deleteSubjectForUser(userId, subjectId);
  dispatch(removeSubject(subjectId));
};

export const markTopicCompletedForUser =
  (userId, { subjectId, topicId }) =>
  (dispatch, getState) => {
    dispatch(markTopicCompleted({ subjectId, topicId }));

    const updatedSubject = getState().subjects.subjects.find(
      (subject) => subject.id === subjectId
    );

    if (updatedSubject) {
      updateSubjectForUser(userId, updatedSubject);
    }
  };

export const markRevisionCompletedForUser =
  (userId, { subjectId, topicId }) =>
  (dispatch, getState) => {
    dispatch(markRevisionCompleted({ subjectId, topicId }));

    const updatedSubject = getState().subjects.subjects.find(
      (subject) => subject.id === subjectId
    );

    if (updatedSubject) {
      updateSubjectForUser(userId, updatedSubject);
    }
  };

export default subjectSlice.reducer;