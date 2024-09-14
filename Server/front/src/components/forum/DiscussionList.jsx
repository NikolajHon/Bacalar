import DiscussionItem from "./DiscussionItem";
const DiscussionList = ({ discussions, onDelete }) => {
    return (
        <div className="discussion-list">
            {discussions.map(discussion => (
                <DiscussionItem key={discussion.id} discussion={discussion} onDelete={onDelete} />
            ))}
        </div>
    );
};
export default DiscussionList