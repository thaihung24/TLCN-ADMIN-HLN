import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";

const AddProductScreen = () => {
  return (
    <Box component="form" sx={{ m: 0, minWidth: 1200 }}>
      <TextField required id="name" label="Tên sản phẩm" size="string" />
      &nbsp;
      <TextField required id="image" label="Hình ảnh bìa" size="string" />
      &nbsp;
      <TextField required id="image" label="Giá" size="string" />
      &nbsp;
      <TextField
        required
        sx={{ width: "94%" }}
        multiline
        color="warning"
        margin="dense"
        id="outlined-name"
        label="Mô tả sản phẩm"
        size="string"
      />
      <Stack direction="row" spacing={1} sx={{ marginBottom: "0.4rem" }}>
        {/* Manufactor */}
        <FormControl sx={{ width: "31%" }}>
          <InputLabel id="manu">Nhà sản xuất</InputLabel>
          <Select labelId="manu" id="optimanuon" label="Hãng">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Apple</MenuItem>
            <MenuItem value={21}>SamSung</MenuItem>
            <MenuItem value={22}>Lenovo</MenuItem>
            <MenuItem value={22}>Dell</MenuItem>
          </Select>
        </FormControl>

        {/* Category */}
        <FormControl sx={{ width: "31%" }}>
          <InputLabel id="cate">Danh mục</InputLabel>
          <Select labelId="cate" id="cate" label="cate">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Điện thoại</MenuItem>
            <MenuItem value={21}>Tablet</MenuItem>
            <MenuItem value={22}>Laptop</MenuItem>
            <MenuItem value={22}>Phụ kiện</MenuItem>
          </Select>
        </FormControl>
        {/* Category */}
        <FormControl sx={{ width: "31%" }}>
          <InputLabel id="subCate">Danh mục con</InputLabel>
          <Select labelId="subCate" id="subCate" label="subCate">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>IOS</MenuItem>
            <MenuItem value={21}>Android</MenuItem>
            <MenuItem value={22}>Windows</MenuItem>
            <MenuItem value={22}>MacOS</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={1}>
        {/* Option */}
        <FormControl sx={{ width: "31%" }}>
          <InputLabel id="option">Option</InputLabel>
          <Select labelId="option" id="option" label="option">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Bộ nhớ 32GB</MenuItem>
            <MenuItem value={21}>Bộ nhớ 64GB</MenuItem>
            <MenuItem value={22}>Bộ nhớ 128GB</MenuItem>
            <MenuItem value={22}>512GB</MenuItem>
          </Select>
        </FormControl>
        {/* Color */}
        <FormControl sx={{ width: "31%" }}>
          <InputLabel id="color">Màu sắc</InputLabel>
          <Select labelId="color" id="color" label="color">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Vàng</MenuItem>
            <MenuItem value={21}>Trắng</MenuItem>
            <MenuItem value={22}>Xanh</MenuItem>
            <MenuItem value={22}>Đen</MenuItem>
            <MenuItem value={22}>Bạc</MenuItem>
          </Select>
        </FormControl>
        {/* Color */}
        <FormControl sx={{ width: "31%" }}>
          <TextField
            fullWidth
            required
            id="quantity"
            label="Số lượng nhập hàng"
            size="string"
          />
        </FormControl>
      </Stack>
      <Box>
        <TextField
          sx={{ width: "94%" }}
          required
          id="image"
          label="Hình ảnh sản phẩm"
          size="string"
        />
      </Box>
      <TextField
        margin="dense"
        id="outlined-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
      />
    </Box>
  );
};

export default AddProductScreen;
