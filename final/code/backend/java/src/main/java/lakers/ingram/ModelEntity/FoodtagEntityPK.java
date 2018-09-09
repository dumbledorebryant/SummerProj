package lakers.ingram.ModelEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class FoodtagEntityPK implements Serializable {
    private int tagId;
    private int foodId;

    @Column(name = "tagID", nullable = false)
    @Id
    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
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

        FoodtagEntityPK that = (FoodtagEntityPK) o;

        if (tagId != that.tagId) return false;
        if (foodId != that.foodId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = tagId;
        result = 31 * result + foodId;
        return result;
    }
}
