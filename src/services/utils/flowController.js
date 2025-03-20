/* eslint-disable no-await-in-loop */

import { Box, Button } from "components";
import { contentTypes } from "data/constants/META_DATA_MAP";
import { useNavigate } from "react-router-dom";

const URL =
  "https://s3-alpha-sig.figma.com/img/69cd/81b7/d88575df093882e0ba7d7200120ba205?Expires=1702252800&Signature=cg5qt6~4u8A01GUYbkNoa71ZMF20bavZoldir6Cs0qzf2ALdvdToWT0vn7y-SCoJg2fxwv1RodTYM~xqXwSe3KwMYMAu4us1X5adzmdourCkCZwpltQp2YvHr9SgG3HO8I9PUseEMMhoKPjY1szvGaVrvxIKREfTEFxNka1GBzo54sRoowJsAElFjq28sbrhM-j2QH30J2SdqpZv95IBCINghnI8an6sjn816ln0RRqUDNQWcczGCEh0txggU7HoyUDMqeH7MAR8mXlxfJqh7GcynR2Xq7yHcWgVJcavf~4dq-Rlsq7vlNbVXJEKW92Z2cjZdsBBogxXktuMaf3nTA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

function Submit() {
  const navigate = useNavigate();

  return (
    <Box className="width-100">
      <Button
        sx={{ float: "right", marginBottom: 1 }}
        onClick={() => {
          navigate("/end");
        }}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </Box>
  );
}

async function flowController(chatCtlParam, upcomingQuestion, postUserResponse, surveyID) {
  if (upcomingQuestion !== null) {
    const { question } = upcomingQuestion;
    let quesMeta;
    for (let i = 0; i < question.question_metadata.length; i += 1) {
      quesMeta = question.question_metadata[i];
      await chatCtlParam.addMessage({
        type: contentTypes[quesMeta.content_type_id],
        content: quesMeta.value,
        id: question.id,
        self: false,
        avatar: URL,
        category: "question",
        followUp: question.follow_up,
      });
    }
    let answer = {};
    let userResponse = {};
    let apiResponse = {};
    let selectedOption = {};
    let hasReaction = false;

    switch (question.answer_type_id) {
      case 2: // Subjective case
        answer = await chatCtlParam.setActionRequest({
          type: "text",
          questionId: question.id,
          placeholder: "Please enter something",
        });
        userResponse = {
          survey_id: surveyID,
          question_id: question?.id,
          question_uuid: question?.uuid,
          response: answer.value,
        };
        apiResponse = await postUserResponse(userResponse);

        hasReaction = !!apiResponse.response.question.reaction?.reaction_metadata[0].value;

        if (hasReaction) {
          await chatCtlParam.addMessage({
            type: contentTypes[
              apiResponse.response.question.reaction?.reaction_metadata[0].content_type_id
            ],
            content: apiResponse.response.question.reaction?.reaction_metadata[0].value,
            id: apiResponse.response.question.reaction?.reaction_metadata[0].id,
            self: false,
            avatar: URL,
            category: "reaction",
          });
        }

        break;
      case 3: // Multiple case
        answer = await chatCtlParam.setActionRequest({
          type: "multi-select",
          options: question.options.map((option) => ({
            value: option.option_metadata[0].value,
            text: option.option_metadata[0].value,
            id: option.id,
          })),
        });
        userResponse = {
          survey_id: surveyID,
          question_id: question?.id,
          question_uuid: question?.uuid,
          option_ids: answer.options.map((option) => option.id),
        };
        apiResponse = await postUserResponse(userResponse);

        selectedOption = await apiResponse.response.question.options.find(
          (option) => option.id === apiResponse.response.option_ids[0]
        );

        hasReaction = !!selectedOption?.reaction?.reaction_metadata[0]?.value;

        if (hasReaction) {
          await chatCtlParam.addMessage({
            type: contentTypes[selectedOption.reaction.reaction_metadata[0].content_type_id],
            content: selectedOption.reaction.reaction_metadata[0].value,
            id: selectedOption.reaction.reaction_metadata[0].id,
            self: false,
            avatar: "-",
            category: "reaction",
          });
        }

        break;

      default:
        answer = await chatCtlParam.setActionRequest({
          type: "select",
          options: question.options.map((option) => ({
            value: option.option_metadata[0].value,
            text: option.option_metadata[0].value,
            id: option.id,
          })),
        });
        userResponse = {
          survey_id: surveyID,
          question_id: question?.id,
          question_uuid: question?.uuid,
          option_id: answer.option.id,
        };
        apiResponse = await postUserResponse(userResponse);

        selectedOption = await apiResponse.response.question.options.find(
          (option) => option.id === apiResponse.response.option_id
        );

        hasReaction = !!selectedOption.reaction.reaction_metadata[0].value;

        if (hasReaction) {
          await chatCtlParam.addMessage({
            type: contentTypes[selectedOption.reaction.reaction_metadata[0].content_type_id],
            content: selectedOption.reaction.reaction_metadata[0].value,
            id: selectedOption.reaction.reaction_metadata[0].id,
            self: false,
            avatar: "-",
            category: "reaction",
          });
        }

        break;
    }

    if (apiResponse.next_question !== null)
      flowController(chatCtlParam, apiResponse.next_question, postUserResponse, surveyID);
    else
      await chatCtlParam.setActionRequest({
        type: "custom",
        Component: Submit,
      });
  }
  if (upcomingQuestion === null) {
    await chatCtlParam.setActionRequest({
      type: "custom",
      Component: Submit,
    });
  }
}

export default flowController;
