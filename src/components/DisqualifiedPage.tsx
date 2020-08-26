import React from 'react';

type DisqaulificationProps = {
    message: string
}
const DisqualifiedPage: React.FC<DisqaulificationProps> = ({message}) => {
    return (
        <div>
            <h1>Something went wrong</h1>
            <p className="disqualify-message">{message}</p>
            <p className="contact-agent">
                For further assistance please contact an agent at <a href="tel:555-0109">555-0109</a> or <a href="mailto:customerservice@example.org">customerservice@example.org</a>
            </p>
        </div>
    );
};

export default DisqualifiedPage;
