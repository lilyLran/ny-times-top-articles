export default function Spinner() {
    return (
        <div className='center-vertical'>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}