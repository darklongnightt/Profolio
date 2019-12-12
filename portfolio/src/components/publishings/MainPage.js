import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import M from "materialize-css";
import parallax from "../../img/parallax.jpg";
import EducationSection from "./EducationSection";
import EmploymentSection from "./EmploymentSection";
import ProjectSection from "./ProjectSection";
import CustomSection from "./CustomSection";
import ProfileSection from "./ProfileSection";

class MainPage extends Component {
  state = {
    currentComponent: "profile"
  };

  componentDidMount() {
    M.AutoInit();
  }

  handleClick = component => {
    this.setState({
      currentComponent: component
    });
  };

  render() {
    const { educations, employments, customs, projects, user } = this.props;
    var component;

    // Waits for data load and renders section based on current state
    if (educations && employments && customs && projects && user) {
      switch (this.state.currentComponent) {
        case "educations":
          component = (
            <EducationSection
              educations={educations && educations}
              active={user.publishEducations}
            />
          );
          break;
        case "employments":
          component = (
            <EmploymentSection
              employments={employments && employments}
              active={user.publishEmployments}
            />
          );
          break;
        case "projects":
          component = (
            <ProjectSection
              projects={projects && projects}
              active={user.publishProjects}
            />
          );

          break;
        case "customs":
          component = (
            <CustomSection
              customs={customs && customs}
              active={user.publishCustoms}
            />
          );

          break;

        case "profile":
          component = <ProfileSection profile={user} />;
          break;

        default:
      }

      return (
        <React.Fragment>
          <div className="parallax-container ptop">
            <div className="parallax">
              <img src={parallax} alt="" />
            </div>
          </div>

          <div className="section white">
            <div className="row">
              <div className="col offset-m1 offset-s1 m2 s2 ">
                <a
                  href="#!"
                  className="btn-floating btn-large waves-effect waves-light yellow darken-2 parallax-top"
                  onClick={() => this.handleClick("profile")}
                >
                  <i className="material-icons">person</i>
                </a>
              </div>
              <div className="col m2 s2 center">
                <button
                  className="btn-floating btn-large waves-effect waves-light red lighten-2 parallax-top"
                  onClick={() => this.handleClick("educations")}
                >
                  <i className="material-icons">school</i>
                </button>
              </div>

              <div className="col m2 s2 center">
                <a
                  href="#!"
                  className="btn-floating btn-large waves-effect waves-light blue lighten-1 parallax-top"
                  onClick={() => this.handleClick("employments")}
                >
                  <i className="material-icons">business_center</i>
                </a>
              </div>

              <div className="col m2 s2 center">
                <a
                  href="#!"
                  className="btn-floating btn-large waves-effect waves-light green lighten-1 parallax-top"
                  onClick={() => this.handleClick("projects")}
                >
                  <i className="material-icons">developer_mode</i>
                </a>
              </div>

              <div className="col m2 s2 center">
                <a
                  href="#!"
                  className="btn-floating btn-large waves-effect waves-light yellow darken-2 parallax-top"
                  onClick={() => this.handleClick("customs")}
                >
                  <i className="fa fa-trophy" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <div className="row container p-content">{component}</div>

            <div className="parallax-btm white-text center">
              <h4>Getting In Touch</h4>
              <div className="row">
                <h6 className="col offset-m2 m4 s6">
                  <i
                    className="fa title-icon fa-envelope"
                    aria-hidden="true"
                  ></i>
                  {user.email}
                </h6>

                {user.socialUrl && (
                  <a href={user.socialUrl}>
                    <h6 className="col m4 s6 white-text">
                      <i
                        className="fa fa-linkedin-square icon-space"
                        aria-hidden="true"
                      ></i>
                      LinkIn
                    </h6>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="parallax-container pbtm">
            <div className="parallax">
              <img src={parallax} alt="" />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="parallax-container ptop">
            <div className="parallax">
              <img src={parallax} alt="" />
            </div>
          </div>

          <div className="section white center ">
            <div className="preloader-wrapper big active preloader-margin">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            <div className="p-content"></div>
          </div>

          <div className="parallax-container pbtm">
            <div className="parallax">
              <img src={parallax} alt="" />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users && users[id];

  return {
    user: user,
    educations: state.firestore.ordered.educations,
    employments: state.firestore.ordered.employments,
    projects: state.firestore.ordered.projects,
    customs: state.firestore.ordered.customs
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "users",
        doc: props.match.params.id
      },
      {
        collection: "users",
        doc: props.match.params.id,
        subcollections: [{ collection: "educations" }],
        orderBy: ["createdAt", "desc"],
        storeAs: "educations"
      },
      {
        collection: "users",
        doc: props.match.params.id,
        subcollections: [{ collection: "employments" }],
        orderBy: ["createdAt", "desc"],
        storeAs: "employments"
      },
      {
        collection: "users",
        doc: props.match.params.id,
        subcollections: [{ collection: "projects" }],
        orderBy: ["createdAt", "desc"],
        storeAs: "projects"
      },
      {
        collection: "users",
        doc: props.match.params.id,
        subcollections: [{ collection: "customs" }],
        orderBy: ["createdAt", "desc"],
        storeAs: "customs"
      }
    ];
  })
)(MainPage);