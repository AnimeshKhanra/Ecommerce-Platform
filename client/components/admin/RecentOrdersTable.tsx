export default function RecentOrdersTable({ orders }: { orders: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>

            <table className="w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders?.map((order) => (
                        // <tr key={order.id}>
                        <tr key={Date.now()}>
                            {/* <td>{order?.id?.slice(0, 8)}</td> */}
                            <td>{order?.id ? order.id.slice(0, 8) : 'N/A'}</td>

                            <td>{order?.user?.name || 'Unknown User'}</td>

                            <td>₹{ order?.totalAmount || 0 }</td>

                            <td>{order?.status || 'UNKNOWN'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
