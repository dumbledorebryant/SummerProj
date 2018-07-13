package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "userlikefood", schema = "SummerProj", catalog = "")
@IdClass(UserlikefoodEntityPK.class)
public class UserlikefoodEntity implements Serializable {
    private int userId;
    private int foodId;

    @Id
    @Column(name = "userID", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "foodID", nullable = false)
    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserlikefoodEntity that = (UserlikefoodEntity) o;

        if (userId != that.userId) return false;
        if (foodId != that.foodId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + foodId;
        return result;
    }
}
