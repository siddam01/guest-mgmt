import pandas as pd
from sklearn.linear_model import LinearRegression

def predict_price(occupancy_rate):
    model = LinearRegression()
    # Train model with historical data (mock)
    X = pd.DataFrame([30, 60, 90], columns=['occupancy'])
    y = [1000, 1500, 2000]
    model.fit(X, y)
    return model.predict([[occupancy_rate]])[0]