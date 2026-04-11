import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "./features/subjects/subjectSlice";
import studyPlanReducer from "./features/studyPlan/studyPlanSlice"

export const store = configureStore({
  reducer: {
    subjects: subjectReducer,
    studyPlan: studyPlanReducer,
  },
});