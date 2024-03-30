import PropTypes from 'prop-types';

const Message = ({ message }) => {

  return (
    <div className="block m-3 mt-auto mb-auto shadow-md p-3 rounded-md clear-both">
      <h2>{message}</h2>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;