import { connect } from "react-redux";

function Graph({ data }) {
  return;
}

const mapStateToProps = (state) => {
  return {
    data: state.allData,
  };
};

export default connect(mapStateToProps, null)(Graph);
