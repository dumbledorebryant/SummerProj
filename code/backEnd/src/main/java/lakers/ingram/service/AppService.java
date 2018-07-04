package lakers.ingram.service;

import lakers.ingram.ModelEntity.UserEntity;

import java.util.List;

public interface AppService {
    public Integer addUser(UserEntity user);

    public void deleteUser(UserEntity user);

    public void updateUser(UserEntity user);

    public UserEntity getUserById(int id);

    public UserEntity getUserByName(String name);

    public UserEntity getUserByPhone(String phone);

    public List<UserEntity> getAllUsers();
}
