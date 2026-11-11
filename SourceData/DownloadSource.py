import pandas as pd
import os
import kagglehub
from kagglehub import KaggleDatasetAdapter

script_dir = os.path.dirname(os.path.abspath(__file__))

# Games dataset
csv_path = os.path.join(script_dir, "games_data.csv")
df = pd.read_parquet("hf://datasets/atalaydenknalbant/video-games-dataset/videogames_data.parquet")
df.to_csv(csv_path, index=False, encoding="utf-8")

print(f"Games dataset successfully saved to: {csv_path}")

#Steam dataset
file_name = "steam_data.csv"
csv_path = os.path.join(script_dir, file_name)
kaggle_filename = "steam_games.csv"
df = kagglehub.dataset_load(
  KaggleDatasetAdapter.PANDAS,
  "hubertsidorowicz/steam-games-dataset-daily-updates",
  kaggle_filename,
)
df.to_csv(csv_path, index=False, encoding="utf-8")

print(f"Steam dataset successfully saved to: {csv_path}")

#Sales dataset
file_name = "sales_data.csv"
csv_path = os.path.join(script_dir, file_name)
kaggle_filename = "cleaned_global_video_game_sales.csv"
df = kagglehub.dataset_load(
  KaggleDatasetAdapter.PANDAS,
  "samanfatima7/cleaned-global-video-game-sales-dataset",
  kaggle_filename,
)
df.to_csv(csv_path, index=False, encoding="utf-8")

print(f"Sales dataset successfully saved to: {csv_path}")