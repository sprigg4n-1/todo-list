import { useState } from 'react';

import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCalendar3 } from 'react-icons/bs';
import { TbCalendarShare } from 'react-icons/tb';
import { TbCalendarDown } from 'react-icons/tb';
import { TbCalendarPlus } from 'react-icons/tb';

import CheckBtn from '../listItem/btns/CheckBtn';
import ImportantBtn from '../listItem/btns/ImportantBtn';
import DeleteBtn from '../listItem/btns/DeleteBtn';

import { Calendar } from 'react-date-range';

import './editingItem.css';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';

const EditingItem = ({
  activeEditing,
  elemId,
  important,
  createdDate,
  removeTodoItem,
  toggleCheckedItem,
  toggleImportantItem,
  closeEditingMode,
  writeNewText,
  newText,
  toggleDatePick,
  setActiveDatePick,
  changeItemDueDate,
  activeDatePick,
  dueDate,
}) => {
  /**
   * style for editing mode and for date pick element
   */
  const editingStyle = activeEditing ? 'editing' : 'editing closed';
  const datePickStyle = activeDatePick
    ? 'editing__date-element'
    : 'editing__date-element hide';

  const addDueDateStyle = !dueDate
    ? 'editing__date-pick'
    : format(new Date(dueDate), 'MM/dd/yyyy') >=
      format(new Date(), 'MM/dd/yyyy')
    ? 'editing__date-pick completed'
    : 'editing__date-pick overdue';

  // ref for date pick element
  const refDate = useRef(null);

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const selectDueDate = (date) => {
    changeItemDueDate(elemId, date);
    setOpenDatePicker(false);
  };

  /**
   * functions for closing date pick element
   * when click outside element and press key esc
   */
  const hideOnClickOutside = (e) => {
    if (refDate.current && !refDate.current.contains(e.target)) {
      setActiveDatePick(false);
    }
  };

  const hideOnPressEsc = (e) => {
    if (e.key === 'Escape') {
      setActiveDatePick(false);
    }
  };

  /**
   * when app start loading functions
   */
  useEffect(() => {
    document.addEventListener('click', hideOnClickOutside, true);
    document.addEventListener('keydown', hideOnPressEsc, true);
  }, []);

  return (
    <div className={editingStyle}>
      <div className="editing__top">
        <div className="editing__title">
          <FaRegEdit />
          <span>Editing task</span>
        </div>
        <div className="editing__close" onClick={closeEditingMode}>
          <AiOutlineClose />
        </div>
      </div>

      <div className="editing__inner">
        <div className="editing__info">
          <CheckBtn toggleCheckedItem={toggleCheckedItem} elemId={elemId} />
          <input
            className="editing__info-input"
            type="text"
            value={newText}
            onChange={writeNewText}
          />
          <div className="editing__info-important">
            <ImportantBtn
              important={important}
              toggleImportantItem={toggleImportantItem}
              elemId={elemId}
            />
          </div>
        </div>
        <div className="editing__date">
          <div className="editing__date-pick-box">
            <div className={addDueDateStyle} onClick={toggleDatePick}>
              <BsCalendar3 />
              <p>
                {!dueDate
                  ? 'Add due date'
                  : format(new Date(dueDate), 'MM/dd/yyyy') ===
                    format(new Date(), 'MM/dd/yyyy')
                  ? 'Due: Today'
                  : format(new Date(dueDate), 'MM/dd/yyyy') ===
                    format(
                      new Date().setDate(new Date().getDate() + 1),
                      'MM/dd/yyyy'
                    )
                  ? 'Due: Tomorrow'
                  : format(new Date(dueDate), 'MM/dd/yyyy') ===
                    format(
                      new Date().setDate(new Date().getDate() - 1),
                      'MM/dd/yyyy'
                    )
                  ? 'Due: Yesterday'
                  : `Due: ${format(new Date(dueDate), 'MM/dd/yyyy')}`}
              </p>
            </div>
            {dueDate ? (
              <AiOutlineClose
                onClick={() => changeItemDueDate(elemId, null)}
                className="editing__clear-date"
              />
            ) : null}
          </div>

          <div className={datePickStyle} ref={refDate}>
            {!openDatePicker ? (
              <>
                <h3>Due</h3>
                <ul>
                  <li
                    onClick={() => {
                      changeItemDueDate(elemId, new Date().getTime());
                    }}
                  >
                    <TbCalendarDown /> <span>Today</span>
                  </li>
                  <li
                    onClick={() => {
                      changeItemDueDate(
                        elemId,
                        new Date(
                          new Date().setDate(new Date().getDate() + 1)
                        ).getTime()
                      );
                    }}
                  >
                    <TbCalendarShare /> <span>Tomorrow</span>
                  </li>
                  <li
                    onClick={() =>
                      setOpenDatePicker((openDatePicker) => !openDatePicker)
                    }
                  >
                    <TbCalendarPlus /> <span>Pick a date</span>
                  </li>
                </ul>
              </>
            ) : null}

            {openDatePicker ? (
              <Calendar
                date={new Date().getTime()}
                onChange={selectDueDate}
                className="editing__calendar"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="editing__bottom">
        <p>
          Created{' '}
          {format(new Date(createdDate), 'MM/dd/yyyy') ===
          format(new Date(), 'MM/dd/yyyy')
            ? 'today'
            : format(new Date(createdDate), 'MM/dd/yyyy') ===
              format(new Date().setDate(new Date().getDate() + 1), 'MM/dd/yyyy')
            ? 'tomorrow'
            : format(new Date(createdDate), 'MM/dd/yyyy') ===
              format(new Date().setDate(new Date().getDate() - 1), 'MM/dd/yyyy')
            ? 'yesterday'
            : `${format(new Date(createdDate), 'MM/dd/yyyy')}`}
        </p>
        <div className="editing__delete">
          <DeleteBtn removeTodoItem={removeTodoItem} elemId={elemId} />
        </div>
      </div>
    </div>
  );
};

export default EditingItem;
