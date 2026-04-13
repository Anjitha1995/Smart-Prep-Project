import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserSession } from "../../services/storageServices";
import { loadSubjectsForUser } from "../../features/subjects/subjectSlice";
import { generateStudyPlanFromSubjects } from "../../features/studyPlan/studyPlanSlice";
import { selectSubjects } from "../../features/subjects/subjectSelectors";

export default function DashboardDataLoader({ children }) {
  const dispatch = useDispatch();
  const subjects = useSelector(selectSubjects);
  const hasLoadedSubjects = useRef(false);

  const session = getLoggedInUserSession();
  const userId = session?.id;

  useEffect(() => {
    if (!userId || hasLoadedSubjects.current) return;

    dispatch(loadSubjectsForUser(userId));
    hasLoadedSubjects.current = true;
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId) return;

    dispatch(generateStudyPlanFromSubjects(subjects, 3));
  }, [dispatch, subjects, userId]);

  return children;
}