package server.example.javaServer.business.concretes.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.doctor.DoctorService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.DoctorDao;
import server.example.javaServer.model.userTypes.Doctor;

import java.util.List;

@Service
public class DoctorManager implements DoctorService {
    private DoctorDao doctorDao;

    @Autowired
    public DoctorManager(DoctorDao doctorDao) {
        this.doctorDao = doctorDao;
    }



    @Override
    public DataResult<List<Doctor>> getAll() {
        List<Doctor> doctorList = doctorDao.findAll();

        if(doctorList.isEmpty()){
            return new ErrorDataResult<List<Doctor>>("Doctor list is empty", doctorList);
        }

        return new SuccessDataResult<List<Doctor>>("Doctor list received", doctorList);
    }

    @Override
    public DataResult<List<String>> getRelatedPatientIdsByDoctorId(String doctorId) {
        Doctor doctor = doctorDao.getDoctorById(doctorId);

        if(doctor == null) {
            return new ErrorDataResult<Doctor>("Doctor is null", null);
        }

        return new SuccessDataResult<Doctor>("Doctor detail recieved.", doctor);
    }
}
