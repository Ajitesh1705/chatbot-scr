import { contentTypes } from "data/constants/META_DATA_MAP";

const URL =
  "https://s3-alpha-sig.figma.com/img/69cd/81b7/d88575df093882e0ba7d7200120ba205?Expires=1702252800&Signature=cg5qt6~4u8A01GUYbkNoa71ZMF20bavZoldir6Cs0qzf2ALdvdToWT0vn7y-SCoJg2fxwv1RodTYM~xqXwSe3KwMYMAu4us1X5adzmdourCkCZwpltQp2YvHr9SgG3HO8I9PUseEMMhoKPjY1szvGaVrvxIKREfTEFxNka1GBzo54sRoowJsAElFjq28sbrhM-j2QH30J2SdqpZv95IBCINghnI8an6sjn816ln0RRqUDNQWcczGCEh0txggU7HoyUDMqeH7MAR8mXlxfJqh7GcynR2Xq7yHcWgVJcavf~4dq-Rlsq7vlNbVXJEKW92Z2cjZdsBBogxXktuMaf3nTA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

//       }
const chatConvertor = (responses) => {
  const messages = [];

  responses.forEach((res) => {
    res.question.question_metadata.forEach((ques) => {
      messages.push({
        type: contentTypes[ques.content_type_id],
        content: ques.value,
        id: res.id,
        self: false,
        avatar: URL,
        category: "question",
        followUp: res.question.follow_up,
      });
    });

    switch (res.question.answer_type_id) {
      case 2: // Subjective case
        messages.push({
          type: "text",
          content: res.response,
          id: res.id,
          self: true,
          avatar: "-",
          category: "answer",
        });
        if (res.question.reaction?.reaction_metadata[0].value)
          messages.push({
            type: "text",
            content: res.question.reaction?.reaction_metadata[0].value,
            id: res.id,
            self: false,
            avatar: "-",
            category: "reaction",
          });
        break;
      case 3: // Multiple case
        {
          const optionIdsToFilter = new Set([...res.option_ids]);
          const selectedOptions = res.question.options.filter((item) =>
            optionIdsToFilter.has(item.id)
          );

          selectedOptions.forEach((opt) =>
            opt.option_metadata.forEach((optionMeta) => {
              messages.push({
                type: contentTypes[optionMeta.content_type_id],
                content: optionMeta.value,
                id: opt.id,
                self: true,
                avatar: "-",
                category: "answer",
              });
            })
          );

          if (selectedOptions[0]?.reaction?.reaction_metadata[0]?.value)
            messages.push({
              type: contentTypes[selectedOptions[0].reaction.reaction_metadata[0].content_type_id],
              content: selectedOptions[0].reaction.reaction_metadata[0].value,
              id: selectedOptions[0].reaction.reaction_metadata[0].id,
              self: false,
              avatar: "-",
              category: "reaction",
            });
        }
        break;

      default:
        // Objective case
        {
          const selectedOption = res.question.options.find((option) => option.id === res.option_id);
          selectedOption.option_metadata.forEach((optionMeta) => {
            messages.push({
              type: contentTypes[optionMeta.content_type_id],
              content: optionMeta.value,
              id: res.option_id,
              self: true,
              category: "answer",
              avatar: "-",
            });
            if (selectedOption.reaction.reaction_metadata[0].value)
              messages.push({
                type: contentTypes[selectedOption.reaction.reaction_metadata[0].content_type_id],
                content: selectedOption.reaction.reaction_metadata[0].value,
                id: selectedOption.reaction.reaction_metadata[0].id,
                self: false,
                avatar: "-",
                category: "reaction",
              });
          });
        }
        break;
    }
  });
  return messages;
};

export default chatConvertor;
