package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "todayfood", schema = "SummerProj", catalog = "")
public class TodayfoodEntity {
    private int foodId;
    private Date date;
    private Integer time;
    private Integer windowId;

    @Id
    @Column(name = "foodID", nullable = false)
    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    @Basic
    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "time", nullable = true)
    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TodayfoodEntity that = (TodayfoodEntity) o;

        if (foodId != that.foodId) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (time != null ? !time.equals(that.time) : that.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = foodId;
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "window_id", nullable = true)
    public Integer getWindowId() {
        return windowId;
    }

    public void setWindowId(Integer windowId) {
        this.windowId = windowId;
    }
}
