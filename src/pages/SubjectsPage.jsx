import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/common/Button";
import SubjectCard from "../components/subjects/SubjectCard";
import AddSubjectModal from "../components/subjects/AddSubjectModal";
import { Plus } from "lucide-react";
import { getLoggedInUserSession } from "../services/storageServices";
import {
  addSubjectForUser,
  editSubjectForUser,
  removeSubjectForUser,
} from "../features/subjects/subjectSlice";
import { selectSubjects } from "../features/subjects/subjectSelectors";

export default function SubjectsPage() {
  const dispatch = useDispatch();
  const subjects = useSelector(selectSubjects);

  const session = getLoggedInUserSession();
  const userId = session?.id;

  const [openModal, setOpenModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const handleAddSubject = (subject) => {
    dispatch(addSubjectForUser(userId, subject));
  };

  const handleUpdateSubject = (updatedSubject) => {
    dispatch(editSubjectForUser(userId, updatedSubject));
    setEditingSubject(null);
    setOpenModal(false);
  };

  const handleDeleteSubject = (id) => {
    dispatch(removeSubjectForUser(userId, id));
  };

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingSubject(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Subjects</h1>
          <p className="mt-2 text-slate-600">
            Manage your subjects and syllabus.
          </p>
        </div>

        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => {
            setEditingSubject(null);
            setOpenModal(true);
          }}
        >
          Add Subject
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onDelete={handleDeleteSubject}
            onEdit={handleEditSubject}
          />
        ))}
      </div>

      <AddSubjectModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onAdd={handleAddSubject}
        onUpdate={handleUpdateSubject}
        editSubject={editingSubject}
      />
    </div>
  );
}