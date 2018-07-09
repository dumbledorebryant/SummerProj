package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.WorkerEntity;

import java.io.File;

public interface WorkerDao {
    public WorkerEntity getWorkerById(int id);
    public String newFoodPic(File imageFile, String windowid);
}
