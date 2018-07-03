package lakers.ingram.ModelEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class UserlikefoodEntityPK implements Serializable {
    private int userId;
    private int foodId;

    @Column(name = "userID", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "foodID", nullable = false)
    @Id
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

        UserlikefoodEntityPK that = (UserlikefoodEntityPK) o;

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
