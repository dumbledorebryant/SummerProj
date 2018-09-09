package lakers.ingram.ModelEntity;

import javax.persistence.*;

@Entity
@Table(name = "food", schema = "SummerProj", catalog = "")
public class FoodEntity {
    private int foodId;
    private String foodName;
    private Double price;
    private String tips;
    private Integer likes;
    private Integer windowId;

    public FoodEntity(){};
    public FoodEntity(String foodName,Double price,
                      String tips,Integer likes,Integer windowId){
        this.foodName=foodName;
        this.price=price;
        this.likes=likes;
        this.windowId=windowId;
        this.tips=tips;
    };

    @Id
    @Column(name = "foodID", nullable = false)
    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    @Basic
    @Column(name = "foodName", nullable = true, length = 45)
    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    @Basic
    @Column(name = "price", nullable = true, precision = 0)
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Basic
    @Column(name = "tips", nullable = true, length = 45)
    public String getTips() { return tips; }

    public void setTips(String tips) {
        this.tips = tips;
    }

    @Basic
    @Column(name = "likes", nullable = true)
    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        FoodEntity that = (FoodEntity) o;

        if (foodId != that.foodId) return false;
        if (foodName != null ? !foodName.equals(that.foodName) : that.foodName != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (tips != null ? !tips.equals(that.tips) : that.tips != null) return false;
        if (likes != null ? !likes.equals(that.likes) : that.likes != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = foodId;
        result = 31 * result + (foodName != null ? foodName.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (tips != null ? tips.hashCode() : 0);
        result = 31 * result + (likes != null ? likes.hashCode() : 0);
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
