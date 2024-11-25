window.onload = function() {
    // Fetch class schedule for student
    fetch('http://localhost:3000/api/classes')
        .then(response => response.json())
        .then(data => {
            const scheduleTable = document.getElementById('class-schedule').getElementsByTagName('tbody')[0];
            data.forEach(classData => {
                let row = scheduleTable.insertRow();
                row.innerHTML = `<td>${classData.class_name}</td><td>${classData.start_time} - ${classData.end_time}</td><td>${classData.faculty_id}</td>`;
            });
        });

    // Fetch attendance status
    fetch('http://localhost:3000/api/attendance?student_id=1') // Assuming student_id 1 for demo purposes
        .then(response => response.json())
        .then(data => {
            const attendanceTable = document.getElementById('attendance-status').getElementsByTagName('tbody')[0];
            data.forEach(attendance => {
                let row = attendanceTable.insertRow();
                row.innerHTML = `<td>${attendance.class_name}</td><td>${attendance.status}</td>`;
            });
        });

    // Leave application form logic
    document.getElementById('leave-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const leaveStart = document.getElementById('leave-start').value;
        const leaveEnd = document.getElementById('leave-end').value;
        const reason = document.getElementById('reason').value;

        fetch('http://localhost:3000/api/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id: 1, // Assuming student_id 1 for demo purposes
                leave_start: leaveStart,
                leave_end: leaveEnd,
                reason: reason
            })
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(err => console.error(err));
    });
};