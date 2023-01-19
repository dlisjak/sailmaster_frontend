export const ThankYouMessage = ({ title, content, children = <></> }) => {
  return (
    <div>
      <div className="thank-you-message">
        <p>
          <b>{title}</b>
        </p>
        {content}
      </div>
      {children}
    </div>
  );
};
