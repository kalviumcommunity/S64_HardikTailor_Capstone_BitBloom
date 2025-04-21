import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ title, description, _id, ...rest }: any) => {
  const navigate = useNavigate();

  return (
    <div className="card p-3 shadow-sm h-100">
      <h5>{title}</h5>
      <p>{description.substring(0, 80)}...</p>
      <button
        className="btn btn-sm btn-outline-primary mt-auto"
        onClick={() => navigate(`/resources/${_id}`)}
      >
        Read More
      </button>
    </div>
  );
};

export default ResourceCard;
