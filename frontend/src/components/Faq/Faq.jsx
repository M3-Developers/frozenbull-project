import "./Faq.css";

const Faq = ({ title, content }) => {
    return(
        <main className="FaqComponent-container">
            <h4>{title}</h4>
            <p>{content}</p>
        </main>
    );
}

export default Faq;