/* eslint-disable */
function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, duration) {
    const toMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const workStartMin = toMinutes(workStart);
    const workEndMin = toMinutes(workEnd);
    const meetingStartMin = toMinutes(meetingStart);
    const meetingEndMin = meetingStartMin + duration;

    return meetingStartMin >= workStartMin && meetingEndMin <= workEndMin;
}
