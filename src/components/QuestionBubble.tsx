// @ts-ignore
import Box from "monday-ui-react-core/dist/Box";

export default function QuestionBubble({
  text,
  userData,
}: {
  text: string;
  userData: any;
}) {
  return (
    <div className="question-container">
      <Box // Not Monday Background Colors
        className="question"
        border={Box.borders.DEFAULT}
        rounded={Box.roundeds.MEDIUM}
      >
        <p>
          {/* In pre tag Enter is not visible, also pre tag is not returns the new tag. Need to create processor that will replace enter character on <br/>*/}
          <b>You:</b> {text}
        </p>
      </Box>
      <img title="avatar" src={userData.avatar} />
    </div>
  );
}
