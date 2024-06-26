import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import { Button } from "react-bootstrap";
import * as client from "./clients";
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId, dispatch]);

  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    console.log(status);
    dispatch(updateModule(module));
  };

  return (
    <div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="row pb-0 mb-0">
            <div className="col-auto">
              <input
                value={module.name}
                onChange={(e) =>
                  dispatch(setModule({ ...module, name: e.target.value }))
                }
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className="col-auto ms-1">
              <Button
                className="p-1"
                style={{ borderRadius: "5px" }}
                variant="success btn-sm"
                onClick={handleAddModule}
              >
                Add
              </Button>
              <Button
                className="p-1 ms-1"
                style={{ borderRadius: "5px" }}
                variant="primary btn-sm"
                onClick={handleUpdateModule}
              >
                Update
              </Button>
            </div>
          </div>
          <div className="row pt-0 mt-1">
            <div className="col-auto p-0 m-0">
              <textarea
                value={module.description}
                onChange={(e) =>
                  dispatch(
                    setModule({ ...module, description: e.target.value })
                  )
                }
                style={{ borderRadius: "5px" }}
              />
            </div>
          </div>
        </li>

        {modulesList
          .filter((module) => module.course === courseId)
          .map((module) => (
            <li
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    style={{ borderRadius: "5px" }}
                    className="btn btn-danger btn-sm ps-1 pe-1 me-1"
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{ borderRadius: "5px" }}
                    className="btn btn-success btn-sm ps-1 pe-1 me-1"
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule?._id === module?._id && (
                <ul className="list-group">
                  {module?.lessons?.map(
                    (lesson: {
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <li className="list-group-item">
                        <FaEllipsisV className="me-2" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ModuleList;
