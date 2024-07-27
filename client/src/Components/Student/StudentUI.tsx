//
export function StudentUI({ results }: { results: any }) {
  return (
    <>
      <div>
        <h3>Student List</h3>
        {results.map((student: any) => (
          <div key={student.id}>
            <p>First Name: {student?.studentFirstName}</p>
            <p>Last Name: {student.studentLastName}</p>
            <p>Student Contact Number: {student.studentContactNumber}</p>
            <p>Description: {student.studentDescription}</p>
          </div>
        ))}
      </div>
    </>
  );
}
