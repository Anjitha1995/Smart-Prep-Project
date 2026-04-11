const SUBJECT_KEY = "smartprep_subjects";

export function getSubjectsByUser(userId) {
    const data = localStorage.getItem(`${SUBJECT_KEY}_${userId}`);
    const subjects = data ? JSON.parse(data) : [];
    return subjects || [];
}

export function saveSubjectForUser(userId, subject) {
    const data = localStorage.getItem(`${SUBJECT_KEY}_${userId}`);
    const userSubjects = data ? JSON.parse(data) : [];
    userSubjects.push(subject);
    localStorage.setItem(`${SUBJECT_KEY}_${userId}`, JSON.stringify(userSubjects));
}

export function deleteSubjectForUser(userId, subjectId) {
    const data = localStorage.getItem(`${SUBJECT_KEY}_${userId}`);
    let userSubjects = data ? JSON.parse(data) : [];

    userSubjects = (userSubjects || []).filter(
        (s) => s.id !== subjectId
    );

    localStorage.setItem(`${SUBJECT_KEY}_${userId}`, JSON.stringify(userSubjects));
}

export function updateSubjectForUser(userId, updatedSubject) {
  const subjects = getSubjectsByUser(userId);

  const updatedSubjects = subjects.map((subject) =>
    subject.id === updatedSubject.id ? updatedSubject : subject
  );

  localStorage.setItem(
    `${SUBJECT_KEY}_${userId}`,
    JSON.stringify(updatedSubjects)
  );
}