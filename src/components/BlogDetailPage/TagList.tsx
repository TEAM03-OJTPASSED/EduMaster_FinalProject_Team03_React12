const allTags = [
  { id: "1", content: "React" },
  { id: "2", content: "TypeScript" },
  { id: "3", content: "JavaScript" },
  { id: "4", content: "Web Development" },
  { id: "5", content: "Frontend" },
  { id: "6", content: "Backend" },
  { id: "7", content: "Full Stack" },
  { id: "8", content: "Programming" },
];

type Props = {
  tags: string[];
};

export const TagList = ({ tags }: Props) => {
  return (
    <div className="mt-8 flex items-center">
      Tag:
      {tags.map((tagId) => {
        const tag = allTags.find((t) => t.id === tagId);
        return tag ? (
          <div key={tag.id} className="px-3 py-2 mx-2 border border-gray-200 rounded-lg">
            {tag.content}
          </div>
        ) : null;
      })}
    </div>
  );
};
