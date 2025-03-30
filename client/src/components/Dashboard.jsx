import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Modal from './Modal';
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
Chart.register(...registerables);

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/feedbacks', {
        headers: { 'x-auth-token': token },
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      navigate('/'); // Redirect to home if there's an error
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/admin/feedbacks/${id}`,
        { status },
        { headers: { 'x-auth-token': token } }
      );
      fetchFeedbacks(); // Refresh feedback list
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting feedback with ID:', id); // Debug log
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:5000/api/admin/feedbacks/${id}`, {
        headers: { 'x-auth-token': token },
      });
      console.log('Delete response:', res.data); // Debug log
      fetchFeedbacks(); // Refresh feedback list
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message); // Debug log
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/export', {
        headers: { 'x-auth-token': token },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedbacks.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!selectedFeedback || !updateMessage) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/admin/feedbacks/${selectedFeedback._id}/update`,
        { message: updateMessage },
        { headers: { 'x-auth-token': token } }
      );
      console.log('Message sent response:', res.data); // Debug log
      setSuccessMessage('Message sent to client successfully!');
      setErrorMessage('');
      setIsModalOpen(false);
      setUpdateMessage('');
      fetchFeedbacks(); // Refresh feedback list
    } catch (err) {
      console.error('Error sending message:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to send message to client.');
      setSuccessMessage('');
    }
  };

  const categoryChartData = {
    labels: ['Bug', 'Feature', 'General'],
    datasets: [{
      label: 'Feedback Distribution by Category',
      data: [
        feedbacks.filter(f => f.category === 'bug').length,
        feedbacks.filter(f => f.category === 'feature').length,
        feedbacks.filter(f => f.category === 'general').length,
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  const priorityChartData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Feedback Distribution by Priority',
      data: [
        feedbacks.filter(f => f.priority === 'low').length,
        feedbacks.filter(f => f.priority === 'medium').length,
        feedbacks.filter(f => f.priority === 'high').length,
      ],
      backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
    }],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Export PDF
          </button>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback Distribution by Category</h2>
            <div className="h-64">
              <Bar
                data={categoryChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback Distribution by Priority</h2>
            <div className="h-64">
              <Pie
                data={priorityChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Feedbacks</span>
              <span className="text-xl font-bold text-blue-600">{feedbacks.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">High Priority</span>
              <span className="text-xl font-bold text-red-600">
                {feedbacks.filter(f => f.priority === 'high').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bugs Reported</span>
              <span className="text-xl font-bold text-purple-600">
                {feedbacks.filter(f => f.category === 'bug').length}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 p-6">Feedback List</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feedbacks.map(feedback => (
                <tr key={feedback._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${feedback.user?.username}&background=random`}
                          alt={feedback.user?.username}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{feedback.user?.username}</div>
                        <div className="text-sm text-gray-500">{feedback.user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      feedback.category === 'bug' ? 'bg-red-100 text-red-800' :
                      feedback.category === 'feature' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      feedback.priority === 'high' ? 'bg-red-100 text-red-800' :
                      feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {feedback.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={feedback.status}
                      onChange={(e) => handleStatusChange(feedback._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        feedback.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                        feedback.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => handleUpdate(feedback)}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      <FaRegPenToSquare className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Send Update"
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSendMessage}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message to Client</label>
            <textarea
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your message"
              value={updateMessage}
              onChange={(e) => setUpdateMessage(e.target.value)}
            />
          </div>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        </Modal>
      )}
    </div>
  );
}
