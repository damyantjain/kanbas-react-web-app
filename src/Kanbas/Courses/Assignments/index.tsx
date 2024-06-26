import Button from 'react-bootstrap/Button';
import "./index.css"
import { FaCheckCircle, FaEllipsisV, FaPencilAlt, FaPlus, FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { KanbasState } from '../../store';
import { deleteAssignment, setAssignment, setAssignments } from './assignmentsReducer';
import { useEffect } from 'react';
import * as service from './service';
function Assignments() {

    const { courseId } = useParams();
    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      service.findAssignmentForCourse(courseId).then((assignments) =>
        dispatch(setAssignments(assignments))
      );
    }, [courseId, dispatch]);

    const handleDelete = () => {
      const result = window.confirm("Do you want to proceed?");
      if (result) {
        console.log("User clicked Yes");
        return true;
      } else {
        console.log("User clicked No");
        return false;
      }
    };

    const handleDeleteAssignment = (assignmentId: string) => {
      service.deleteAssignment(assignmentId).then((status) => {
        dispatch(deleteAssignment(assignmentId));
      });
    };

  return (
    <div className="col me-2">
      <div className="row wd-margin-top">
        <div className="float-end wd-margin-right">
          <div className="wd-button float-end">
            <a className="btn btn-secondary btn-sm" href="#" role="button">
              <FaEllipsisV />
            </a>
          </div>
          <div className="wd-button float-end">
            <Link to={"../Assignments/Editor"} className="btn btn-danger btn-sm" role="button">
            <FaPlus className="me-1" />
              Assignment
            </Link>
          </div>

          <div className="wd-button float-end">
            <Button variant="secondary btn-sm">
              <FaPlus className="me-1" />
              Group
            </Button>{' '}
          </div>
          <div className="float-start w-25">
            <input className="form-control" id="input1" placeholder="Search for Assignment" />
          </div>
        </div>
      </div>
      <hr />
      <div className="wd-assignments-list">
        <ul className="list-group wd-margin-left" style={{ borderRadius: "0%" }}>
          <li className="list-group-item list-group-item-secondary">
            <div>
              <FaEllipsisV className="me-2" />
              <b>Assignments</b>
              <span className="float-end">

                <label
                  className="form-label pe-2 ps-2 me-3"
                  style={{ borderRadius: "50px", borderWidth: "1px", borderStyle: "solid" }}
                >40% of Total</label>
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
          </li>
          <ul className="list-group" style={{ borderRadius: "0%" }}>
            {assignmentList.map((assignment) => (
              <li className='list-group-item'>
                <div className='row'>
                  <div className='col-auto' style={{ margin: "auto", display: "flex" }}>
                    <FaEllipsisV style={{ verticalAlign: "middle", marginRight: "10px" }} />
                    <FaPencilAlt />
                  </div>
                  <div className='col wd-fg-color-gray ps-0 ms-2'>
                    <Link style={{ color: 'green', textDecoration: 'none' }} className="fw-bold ps-0" to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                      {assignment.name}
                    </Link>
                    <br />
                    {assignment.description} |
                    <br /><b>Due</b> {assignment.dueDateTime.slice(0,16)} | {assignment.points} points
                  </div>
                  <div className="col-auto" style={{ margin: "auto", display: "flex" }}>
                  <button className="btn m-0 pt-0 pb-0 me-1 btn-danger btn-sm"
                  onClick={() => {handleDelete() ? handleDeleteAssignment(assignment._id) : 
                    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
                  }}>
                  Delete</button>
                    <FaCheckCircle
                      style={{ color: "green" }} />
                    <FaEllipsisV style={{ verticalAlign: "middle" }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </ul>
      </div>
    </div >
  );
}
export default Assignments;