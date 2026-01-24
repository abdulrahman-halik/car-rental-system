import React from 'react';
import { assets, dummyDashboardData } from '../../assets/assets';
import Title from '../../components/owner/Title';

const Dashboard = () => {
    const currency = import.meta.env.VITE_CURRENCY;

    const data = dummyDashboardData;

    const dashboardCards = [
        { title: 'Total Cars', value: data.totalCars, icon: assets.carIconColored, bg: 'bg-blue-50' },
        { title: 'Total Bookings', value: data.totalBookings, icon: assets.listIconColored, bg: 'bg-indigo-50' },
        { title: 'Pending', value: data.pendingBookings, icon: assets.cautionIconColored, bg: 'bg-orange-50' },
        { title: 'Confirmed', value: data.completedBookings, icon: assets.tick_icon, bg: 'bg-emerald-50' },
    ];

    return (
        <div className="flex-1 w-full bg-gray-50 min-h-screen px-4 md:px-10 pt-10 pb-12 font-outfit">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Monitor overall platform performance including total cars, bookings, revenue, and recent activities.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-300"
                    >
                        <div>
                            <h3 className="text-gray-500 text-sm font-medium mb-2">{card.title}</h3>
                            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}>
                            <img src={card.icon} alt="" className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                            <p className="text-sm text-gray-500">Latest customer activity</p>
                        </div>
                        <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">View All</button>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="px-6 py-4">Vehicle</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data.recentBookings.length > 0 ? (
                                    data.recentBookings.map((booking, index) => (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                        <img src={assets.carIconColored} alt="" className="w-5 h-5 opacity-75" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{booking.car.brand} {booking.car.model}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                {currency} {booking.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                                                    ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                                        booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-red-100 text-red-700'
                                                    }
                                                `}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No recent bookings found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden p-4 space-y-4">
                        {data.recentBookings.length > 0 ? (
                            data.recentBookings.map((booking, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-xl space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-gray-100">
                                            <img src={assets.carIconColored} alt="" className="w-5 h-5 opacity-75" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{booking.car.brand} {booking.car.model}</p>
                                            <p className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`ml-auto inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                                            ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                                booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-red-100 text-red-700'
                                            }
                                        `}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200/60">
                                        <span className="text-sm text-gray-500">Amount</span>
                                        <span className="text-sm font-bold text-gray-900">{currency} {booking.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 text-gray-500 text-sm">No recent bookings found.</div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Monthly Revenue */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between h-[230px]">
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-bold text-gray-900">Monthly Revenue</h2>
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <img src={assets.listIconColored} alt="" className="w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-3xl font-bold text-gray-900">{currency} {data.monthlyRevenue.toLocaleString()}</span>
                                <span className="text-sm font-bold text-emerald-500 bg-transparent flex items-center">
                                    <span className="text-lg mr-0.5">↑</span> 12%
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-6">Compared to last month</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                    </div>

                    {/* Fleet Status Chart */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Fleet Status</h2>
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative w-40 h-40">
                                {/* Simple CSS Donut Chart */}
                                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                    <path
                                        className="text-gray-100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.8"
                                    />
                                    <path
                                        className="text-blue-600"
                                        strokeDasharray="75, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-900">75%</span>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-8">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-900">Rented</span>
                                    <span className="text-[10px] text-gray-500">3 Cars</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-200"></span>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-900">Available</span>
                                    <span className="text-[10px] text-gray-500">1 Car</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
