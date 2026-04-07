import Header from "../components3/header2";
import Box from "../components3/box";
import Comment from "../components3/comment";
import Footer2 from "../components3/footer2";
import "./session-report.css";

function SessionReport() {
  return (
    <div className="report"> {/* 🔥 THIS IS REQUIRED */}

      <Header />

      <div className="content"> {/* 🔥 NEW WRAPPER */}
        <div className="boxes">
          <Box property="94%" value="human confidence" />
          <Box property="312" value="words written" />
          <Box property="24m" value="active writing" />
        </div>

        <h4 className="section-title">Signal breakdown</h4>

        <div className="comments">
          <Comment heading="Comment 1" comment="This is the first comment" />
          <Comment heading="Comment 2" comment="This is the second comment" />
          <Comment heading="Comment 3" comment="This is the third comment" />
        </div>
      </div>

      <Footer2 rid="report-123" />

    </div>
  );
}

export default SessionReport;