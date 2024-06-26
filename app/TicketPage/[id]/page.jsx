import TicketForm from '@/app/(components)/TicketForm';

const getTicketById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Tickets/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to get ticket.');
  }

  return res.json();
};

export const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === 'new' ? false : true;
  let updateTicketData = {};
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: 'new',
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
