import { createSlice } from "@reduxjs/toolkit";
import { generateRuleBasedStudyPlan, groupStudyPlan } from "../../utils/studyPlanUtils";

const initialState = {
  plan: [],
  groupedPlan: {
    today: [],
    tomorrow: [],
    upcoming: [],
  },
};

const studyPlanSlice = createSlice({
  name: "studyPlan",
  initialState,
  reducers: {
    setStudyPlan: (state, action) => {
      state.plan = action.payload;
      state.groupedPlan = groupStudyPlan(action.payload);
    },

    clearStudyPlan: (state) => {
      state.plan = [];
      state.groupedPlan = {
        today: [],
        tomorrow: [],
        upcoming: [],
      };
    },
  },
});

export const { setStudyPlan, clearStudyPlan } = studyPlanSlice.actions;

export const generateStudyPlanFromSubjects =
  (subjects, userDailyHours = 3) =>
  (dispatch) => {
    const plan = generateRuleBasedStudyPlan(subjects, userDailyHours);
    dispatch(setStudyPlan(plan));
  };

export default studyPlanSlice.reducer;