import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdEye } from "react-icons/io";
import { BiSortAlt2 } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import ad1 from "./assets/ad-bnr-1.jpg"

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const PRIORITY_COLOR = {
  high: "border-red-500/50 bg-red-500/5",
  medium: "border-amber-400/50 bg-amber-500/5",
  low: "border-emerald-700/50 bg-emerald-700/5",
  noneed: "border-gray-700/50 bg-gray-700/5",
};

const PRIORITY_ORDER = {
  high: 1,
  medium: 2,
  low: 3,
  noneed: 4,
};

const Workbench = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [showOverlay, setShowOverlay] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [modalData, setModalData] = useState({
    title: "",
    desc: "",
    date: "",
    priority: "high",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  });

  const openModal = (id = null) => {
    setEditId(id);
    if (id) {
      const t = todos.find((x) => x.id === id);
      if (t) {
        setModalData({
          title: t.title,
          desc: t.desc,
          date: t.date,
          priority: t.priority,
        });
      }
    } else {
      setModalData({ title: "", desc: "", date: "", priority: "high" });
    }
    setModalOpen(true);
  };

  const saveTodo = () => {
    if (!modalData.title.trim()) return;

    const newTodo = {
      id: editId ?? uuidv4(),
      ...modalData,
      completed: editId
        ? todos.find((t) => t.id === editId)?.completed ?? false
        : false,
    };

    setTodos((prev) =>
      editId
        ? prev.map((t) => (t.id === editId ? newTodo : t))
        : [newTodo, ...prev]
    );

    setModalOpen(false);
    setEditId(null);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteAll = () => {
    setTodos([]);
    setDeleteModalOpen(false);
  };

  return (
    <>
      {deleteModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          <div
            onClick={() => setDeleteModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative z-50 w-80 bg-white rounded-2xl p-5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-center">
              حذف همه آیتم‌ها
            </h3>
            <p className="text-sm text-center mb-4">مطمئن هستید؟</p>
            <div className="flex gap-2">
              <button
                onClick={deleteAll}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 rounded-xl"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          <div
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative z-50 w-80 bg-white rounded-2xl p-5 shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-center">
              {editId ? "ویرایش آیتم" : "ایجاد آیتم"}
            </h3>

            <input
              className="w-full bg-black/5 rounded-xl px-3 py-2 mb-2"
              placeholder="عنوان"
              value={modalData.title}
              onChange={(e) =>
                setModalData({ ...modalData, title: e.target.value })
              }
            />

            <textarea
              className="w-full bg-black/5 rounded-xl px-3 py-2 mb-2"
              placeholder="توضیحات"
              value={modalData.desc}
              onChange={(e) =>
                setModalData({ ...modalData, desc: e.target.value })
              }
            />

            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={modalData.date}
              onChange={(date) =>
                setModalData({
                  ...modalData,
                  date: date ? date.format("YYYY/MM/DD") : "",
                })
              }
              inputClass="bg-black/5 rounded-xl px-3 py-2 mb-2"
              calendarPosition="bottom-center"
              placeholder="تاریخ"
            />

            <select
              className="w-full bg-black/5 rounded-xl px-3 py-2 mb-4"
              value={modalData.priority}
              onChange={(e) =>
                setModalData({ ...modalData, priority: e.target.value })
              }
            >
              <option value="high">بالا</option>
              <option value="medium">متوسط</option>
              <option value="low">پایین</option>
              <option value="noneed">بدون اولویت</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={saveTodo}
                className="flex-1 bg-black text-white py-2 rounded-xl"
              >
                ذخیره
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 rounded-xl"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 mx-auto translate-y-4 w-170 grid grid-cols-2 gap-4 relative">
        <div className="col bg-white w-full rounded-3xl overflow-hidden">
          <h3 className="font-bold text-2xl p-4">دست‌نویس</h3>

          <div className="p-3 py-1 flex justify-between">
            <button className="p-1 w-32 flex justify-center gap-1 items-center rounded-full bg-blue-100 opacity-70">
              <BsStars className="text-xl text-blue-500" /> AI بزودی
            </button>

            <button
              onClick={() => setDeleteModalOpen(true)}
              className="p-1 w-12 flex justify-center items-center rounded-full bg-red-100"
            >
              <RiDeleteBinLine className="text-2xl text-red-500" />
            </button>

            <button className="p-1 w-12 flex justify-center items-center rounded-full bg-black/10">
              <BiSortAlt2 />
            </button>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="p-1 w-12 flex justify-center items-center rounded-full bg-black/10"
            >
              <IoMdEye />
            </button>
          </div>

          <div className="relative p-3 overflow-y-auto h-100">
            {showOverlay && (
              <div className="absolute inset-0 backdrop-blur-[4px] z-40 h-full rounded-xl" />
            )}

            <AnimatePresence>
              {sortedTodos.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`border p-3 mb-3 rounded-xl
                    ${PRIORITY_COLOR[t.priority]}
                    ${t.completed ? "opacity-40" : ""}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleComplete(t.id)}
                      />
                      <h3 className={t.completed ? "line-through" : ""}>
                        {t.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => openModal(t.id)}
                      className="p-1 w-10 rounded-full flex justify-center hover:bg-black/20  bg-black/10"
                    >
                      <MdEdit />
                    </button>
                  </div>

                  <p className="text-xs mt-1">{t.desc}</p>

                  {t.date && (
                    <span className="mt-2 inline-block text-xs bg-gray-200/40 rounded-full px-2">
                      {t.date}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-3">
            <button
              onClick={() => openModal()}
              className="w-full bg-blue-400 hover:bg-blue-300 text-white p-2 rounded-full"
            >
              دست‌نویس جدید +
            </button>
          </div>
        </div>

        <div className="col">
          <div className="bg-white w-full rounded-3xl overflow-hidden max-h-80 relative">
            <h3 className="font-bold text-2xl border-b border-black/10 p-4">
              چند؟!
            </h3>

            <div className="p-4 overflow-y-auto h-60 relative">
              <div className="rounded-xl border border-[0.5px] border-black/10 p-4 flex items-center justify-between mb-2">
                <div>دلار آمریکا</div>
                <div>131000 تومان</div>
              </div>
              <div className="rounded-xl border border-[0.5px] border-black/10 p-4 flex items-center justify-between mb-2">
                <div>پوند</div>
                <div>176000 تومان</div>
              </div>

              <div className="absolute inset-0 bg-white/30 backdrop-blur-[6px] flex items-center justify-center rounded-xl z-50">
                <span className="text-xl font-bold text-gray-700">
                  در حال توسعه
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden mt-4 transition-shadow">
            <a href="https://t.me/Levin_VPN/">
            <span className="absolute end-1 bg-yellow-500 rounded-full text-[10px] p-0.5 m-2 px-2">
              تبلیغ
            </span>
            <img src={ad1} alt="" />
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Workbench;
