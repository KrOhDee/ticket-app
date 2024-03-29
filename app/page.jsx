import TicketCard from './(components)/TicketCard';

const getTickets = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tickets`,
      {
        cache: 'no-store',
      }
    );

    return res.json();
  } catch (error) {
    console.log('Failed to get tickets', error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      {tickets && tickets.length > 0 ? (
        uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    id={_index}
                    key={_index}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h2>No tickets to display</h2>
          <p>
            Please check back later or create a new ticket by clicking the
            ticket icon in the navigation bar.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
