import { useState, useEffect } from 'react';
import { userService } from '../../api';
import { PageContainer, PageHeader, Input, LecturerList } from '../../components';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const LecturerListPage = () => {
  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLecturers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = lecturers.filter(
        (lecturer) =>
          lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lecturer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLecturers(filtered);
    } else {
      setFilteredLecturers(lecturers);
    }
  }, [searchTerm, lecturers]);

  const fetchLecturers = async () => {
    try {
      setLoading(true);
      const data = await userService.getLecturers();
      setLecturers(data);
      setFilteredLecturers(data);
    } catch (error) {
      toast.error('Failed to load lecturers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Lecturers"
        subtitle="Browse available lecturers and book appointments"
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12"
          />
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-text-muted mb-4">
          {filteredLecturers.length} lecturer{filteredLecturers.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Lecturers List */}
      <LecturerList lecturers={filteredLecturers} loading={loading} />
    </PageContainer>
  );
};

export default LecturerListPage;
