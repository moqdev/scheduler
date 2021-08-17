import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./interviewerListItem";
import "components/interviewerList.scss";

function interviewerList(props) {
  const Interviewers =
    Array.isArray(props.interviewers) &&
    props.interviewers.map(function (data) {
      return (
        <InterviewerListItem
          key={data.id}
          name={data.name}
          avatar={data.avatar}
          selected={data.id === props.interviewer}
          setInterviewer={() => props.onChange(data.id)}
        />
      );
    });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
}

interviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default interviewerList;