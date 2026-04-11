import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";
import { Plus, Trash2 } from "lucide-react";
import { validateSubjectData } from "../../utils/validationUtils";
import { deriveSubjectDifficulty } from "../../utils/subjectUtils";

const initialForm = {
  name: "",
  examDate: "",
  totalTopics: 0,
  dailyStudyHours: "",
  revisionFrequency: "",
  priority: "",
  includeRevision: true,
  progress: 0,
  topics: [],
};

const initialTopicInput = {
  name: "",
  difficulty: "",
};

export default function AddSubjectModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  editSubject = null,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [topicInput, setTopicInput] = useState(initialTopicInput);
  const [topicError, setTopicError] = useState({});

  useEffect(() => {
    if (editSubject) {
      setForm({
        id: editSubject.id,
        name: editSubject.name || "",
        examDate: editSubject.examDate || "",
        totalTopics: editSubject.topics?.length || 0,
        dailyStudyHours: editSubject.dailyStudyHours ?? "",
        revisionFrequency: editSubject.revisionFrequency || "",
        priority: editSubject.priority || "",
        includeRevision:
          editSubject.includeRevision !== undefined
            ? editSubject.includeRevision
            : true,
        progress: editSubject.progress ?? 0,
        topics: editSubject.topics || [],
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
    setTopicInput(initialTopicInput);
    setTopicError({});
  }, [editSubject, isOpen]);

  if (!isOpen) return null;

  const getSelectClasses = (hasError) =>
    `mt-2 w-full rounded-2xl border px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 sm:px-5 sm:py-4 sm:text-lg ${
      hasError
        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-slate-200 bg-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
    }`;

  const resetModalState = () => {
    setForm(initialForm);
    setErrors({});
    setTopicInput(initialTopicInput);
    setTopicError({});
  };

  const handleClose = () => {
    resetModalState();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = type === "checkbox" ? checked : value;

    if (name === "dailyStudyHours" || name === "progress") {
      if (value === "") {
        updatedValue = "";
      } else {
        updatedValue = Number(value) < 0 ? 0 : value;
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTopicChange = (e) => {
    const { name, value } = e.target;

    setTopicInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (topicError[name]) {
      setTopicError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddTopic = () => {
    const newTopicErrors = {};

    if (!topicInput.name.trim()) {
      newTopicErrors.name = "Topic name is required";
    }

    if (!topicInput.difficulty) {
      newTopicErrors.difficulty = "Topic difficulty is required";
    }

    setTopicError(newTopicErrors);

    if (Object.keys(newTopicErrors).length > 0) return;

    const newTopic = {
      id: Date.now(),
      name: topicInput.name.trim(),
      difficulty: topicInput.difficulty,
      completed: false,
      revisionCompleted: false
    };

    setForm((prev) => {
      const updatedTopics = [...prev.topics, newTopic];
      return {
        ...prev,
        topics: updatedTopics,
        totalTopics: updatedTopics.length,
      };
    });

    setTopicInput(initialTopicInput);
    setTopicError({});
    setErrors((prev) => ({
      ...prev,
      topics: "",
      totalTopics: "",
    }));
  };

  const handleDeleteTopic = (topicId) => {
    setForm((prev) => {
      const updatedTopics = prev.topics.filter((topic) => topic.id !== topicId);
      return {
        ...prev,
        topics: updatedTopics,
        totalTopics: updatedTopics.length,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedForm = {
      ...form,
      totalTopics: form.topics.length,
    };

    const validationErrors = validateSubjectData(preparedForm);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const subjectDifficulty = deriveSubjectDifficulty(form.topics);

    const subjectPayload = {
      id: form.id || Date.now(),
      name: form.name.trim(),
      examDate: form.examDate,
      totalTopics: form.topics.length,
      difficulty: subjectDifficulty,
      dailyStudyHours: Number(form.dailyStudyHours),
      revisionFrequency: form.revisionFrequency,
      priority: form.priority,
      includeRevision: form.includeRevision,
      progress: Number(form.progress || 0),
      topics: form.topics,
    };

    if (editSubject && onUpdate) {
      onUpdate(subjectPayload);
    } else {
      onAdd(subjectPayload);
    }

    resetModalState();
    onClose();
  };

  const derivedDifficulty = deriveSubjectDifficulty(form.topics);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <Card
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto"
        padding="lg"
        shadow="xl"
        rounded="xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {editSubject ? "Update Subject" : "Add Subject"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter subject details required for study plan generation.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Subject Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Physics"
              error={errors.name}
              required
            />

            <Input
              label="Exam Date"
              name="examDate"
              type="date"
              value={form.examDate}
              onChange={handleChange}
              error={errors.examDate}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Total Topics"
              name="totalTopics"
              type="number"
              value={form.topics.length}
              onChange={() => {}}
              error={errors.totalTopics}
              disabled
            />

            <Input
              label="Daily Study Hours"
              name="dailyStudyHours"
              type="number"
              min="0"
              value={form.dailyStudyHours}
              onChange={handleChange}
              placeholder="e.g. 2"
              error={errors.dailyStudyHours}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="subject-difficulty" className="block text-base font-semibold text-slate-800 sm:text-lg">
                Derived Subject Difficulty
              </label>
              <input name="subject-difficulty" id="subject-difficulty" 
                type="text"
                value={derivedDifficulty || "Will be calculated from topics"}
                readOnly
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-base text-slate-900 outline-none sm:px-5 sm:py-4 sm:text-lg"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-base font-semibold text-slate-800 sm:text-lg">
                Priority <span className="ml-1 text-red-500">*</span>
              </label>
              <select
                name="priority"
                id="priority"
                value={form.priority}
                onChange={handleChange}
                className={getSelectClasses(!!errors.priority)}
              >
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.priority && (
                <p className="mt-2 text-xs font-medium text-red-500 sm:text-sm">
                  {errors.priority}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="revisionFrequency" className="block text-base font-semibold text-slate-800 sm:text-lg">
                Revision Frequency <span className="ml-1 text-red-500">*</span>
              </label>
              <select
              id="revisionFrequency"
                name="revisionFrequency"
                value={form.revisionFrequency}
                onChange={handleChange}
                className={getSelectClasses(!!errors.revisionFrequency)}
              >
                <option value="">Select revision frequency</option>
                <option value="Daily">Daily</option>
                <option value="Every 2 days">Every 2 days</option>
                <option value="Twice a week">Twice a week</option>
                <option value="Weekly">Weekly</option>
              </select>
              {errors.revisionFrequency && (
                <p className="mt-2 text-xs font-medium text-red-500 sm:text-sm">
                  {errors.revisionFrequency}
                </p>
              )}
            </div>

            <Input
              label="Current Progress (%)"
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={form.progress}
              onChange={handleChange}
              placeholder="0"
              error={errors.progress}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-lg font-semibold text-slate-900">Topics</h3>
            <p className="mt-1 text-sm text-slate-500">
              Add topics so the study plan can tell the student exactly what to study.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-[1.3fr_1fr_auto]">
              <Input
                label="Topic Name"
                name="name"
                value={topicInput.name}
                onChange={handleTopicChange}
                placeholder="e.g. Thermodynamics"
                error={topicError.name}
                required
              />

              <div>
                <label htmlFor="topic-difficulty" className="block text-base font-semibold text-slate-800 sm:text-lg">
                  Topic Difficulty <span className="ml-1 text-red-500">*</span>
                </label>
                <select
                id="topic-difficulty"
                  name="difficulty"
                  value={topicInput.difficulty}
                  onChange={handleTopicChange}
                  className={getSelectClasses(!!topicError.difficulty)}
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {topicError.difficulty && (
                  <p className="mt-2 text-xs font-medium text-red-500 sm:text-sm">
                    {topicError.difficulty}
                  </p>
                )}
              </div>

              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={handleAddTopic}
                  leftIcon={<Plus className="h-4 w-4" />}
                  className="w-full md:w-auto"
                >
                  Add Topic
                </Button>
              </div>
            </div>

            {errors.topics && (
              <p className="mt-3 text-xs font-medium text-red-500 sm:text-sm">
                {errors.topics}
              </p>
            )}

            <div className="mt-4 space-y-3">
              {form.topics.length === 0 ? (
                <p className="text-sm text-slate-500">No topics added yet.</p>
              ) : (
                form.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{topic.name}</p>
                      <p className="text-sm text-slate-500">{topic.difficulty}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <span className="text-sm font-medium text-slate-700 sm:text-base">
              Include revision sessions in study plan
            </span>
            <input
              type="checkbox"
              name="includeRevision"
              checked={form.includeRevision}
              onChange={handleChange}
              className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editSubject ? "Update Subject" : "Add Subject"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}