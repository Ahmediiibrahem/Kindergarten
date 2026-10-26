// js/state.js
const state = {
  tab: 'children',
  setup: { selfie: '', className: '', date: '', subjects: [] },
  statuses: {},
  statusTimes: {},
  activities: {},
  dismissed: {},
  modalChild: null,
  activitySelected: [],
  activityPending: null,
  activityChoice: ''
};

const dayKey = () => `${state.setup.date}|${state.setup.className}`;

function loadDayData() {
  try {
    const raw = localStorage.getItem('snabel_teacher_' + dayKey());
    return raw ? JSON.parse(raw) : { statuses: {}, statusTimes: {}, activities: {}, dismissed: {} };
  } catch (e) {
    return { statuses: {}, statusTimes: {}, activities: {}, dismissed: {} };
  }
}

function saveDayData() {
  try {
    localStorage.setItem('snabel_teacher_' + dayKey(), JSON.stringify({
      statuses: state.statuses,
      statusTimes: state.statusTimes,
      activities: state.activities,
      dismissed: state.dismissed
    }));
  } catch (e) {
    console.error('فشل حفظ البيانات في LocalStorage', e);
  }
}
