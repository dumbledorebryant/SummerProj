package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.WeatherEntity;

import java.sql.Timestamp;
import java.util.List;

public interface WeatherDao {
    public List<WeatherEntity> getWeatherByTime(Timestamp date);
}
