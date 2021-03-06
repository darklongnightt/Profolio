import React from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import UnavailableError from "./UnavailableError";

const ProjectSection = props => {
  const { projects, active } = props;
  const colors = ["#e57373", "#64b5f6 ", "#66bb6a", "#fbc02d", "1de9b6"];

  if (active && projects.length > 0) {
    return (
      <div className="center">
        <h4 className="grey-text">Project History</h4>
        <Timeline lineColor={"#ddd"}>
          {projects &&
            projects.map(project => {
              var color = colors[Math.floor(Math.random() * colors.length)];
              const date = (
                <div>
                  <i class="fa fa-terminal nav-icon" aria-hidden="true"></i>
                  {project.skills}
                </div>
              );

              return (
                <TimelineItem
                  key={project.id}
                  dateText={date}
                  dateInnerStyle={{ background: `${color}`, color: "white" }}
                >
                  <h3>{project.title}</h3>
                  <h4>{project.skills}</h4>
                  <div
                    className="display"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  ></div>
                </TimelineItem>
              );
            })}
        </Timeline>
      </div>
    );
  } else {
    return <UnavailableError />;
  }
};

export default ProjectSection;
